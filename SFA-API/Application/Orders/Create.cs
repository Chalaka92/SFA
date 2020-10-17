using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int ShopId { get; set; }
            public int UserId { get; set; }
            public string OrderCode { get; set; }
            public decimal TotalAmount { get; set; }
            public bool IsComplete { get; set; }
            public DateTime? CompletedDate { get; set; }
            public DateTime OrderedDate { get; set; }
            public bool IsEdit { get; set; }
            public DateTime? EditedDate { get; set; }
            public int EditedUserId { get; set; }
            public bool IsCancel { get; set; }
            public DateTime? CanceledDate { get; set; }
            public int CanceledUserId { get; set; }
            public string CanceledReason { get; set; }
            public bool IsSync { get; set; }
            public DateTime? SyncedDate { get; set; }
            public virtual ICollection<OrderItemBatch> OrderItemBatches { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ShopId).GreaterThan(0);
                RuleFor(x => x.UserId).GreaterThan(0);
                RuleFor(x => x.TotalAmount).GreaterThan(0);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = _mapper.Map<Command, Order>(request);
                var shop = await _context.Shops.FindAsync(request.ShopId);
                var orderCode = "odr" + shop.ShopCode.Replace("shprtu", "") + "01";

                if (await _context.Orders.AnyAsync(x => x.ShopId == request.ShopId))
                {
                    orderCode = "odr" + shop.ShopCode.Replace("shprtu", "") + (_context.Orders.AsEnumerable().Where(x => x.OrderCode.Substring(0, x.OrderCode.Length - 2) == "odr" + shop.ShopCode.Replace("shprtu", ""))
                        .Max(x => Convert.ToInt32(x.OrderCode.Substring(x.OrderCode.Length - 2, 2))) + 1).ToString("D2");
                }
                order.OrderCode = orderCode;

                await _context.Orders.AddAsync(order);

                request.OrderItemBatches.ToList().ForEach(async x =>
                {
                    var order = await _context.Orders.FindAsync(x.OrderId);
                    var itemBatch = await _context.ItemBatches.FindAsync(x.ItemBatchId);
                    var orderItemBatchCode = order.OrderCode.Replace("odr", "") + itemBatch.ItemBatchCode.Replace("bch", "");

                    x.OrderItemBatchCode = orderItemBatchCode;
                    x.OrderId = order.Id;
                    await _context.OrderItemBatches.AddAsync(x);

                    //Update SalesRep Item Batch
                    var salesRepItemBatch = await _context.SalesRepItemBatches.Where(y => y.ItemBatchId == x.ItemBatchId).FirstOrDefaultAsync();
                    salesRepItemBatch.ItemCount = salesRepItemBatch.ItemCount - x.ItemCount;
                });

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}