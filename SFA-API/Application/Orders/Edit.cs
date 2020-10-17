using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string LoginEmail { get; set; }
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
                RuleFor(x => x.LoginEmail).NotEmpty();
                RuleFor(x => x.ShopId).GreaterThan(0);
                RuleFor(x => x.UserId).GreaterThan(0);
                RuleFor(x => x.TotalAmount).GreaterThan(0);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.FindAsync(request.Id);

                if (order == null)
                    throw new RestException(HttpStatusCode.NotFound, new { order = "Not Found" });

                var loggedUser = await _userManager.FindByEmailAsync(request.LoginEmail);
                var userDetail = await _context.UserDetails.FirstOrDefaultAsync((x => x.LoggedUserId == loggedUser.Id));

                order.ShopId = request.ShopId == 0 ? order.ShopId : request.ShopId;
                order.UserId = request.UserId == 0 ? order.UserId : request.UserId;
                order.TotalAmount = request.TotalAmount;
                order.IsComplete = request.IsComplete;
                order.CompletedDate = request.CompletedDate;
                if (request.IsEdit)
                {
                    order.IsEdit = request.IsEdit;
                    order.EditedDate = request.EditedDate;
                    order.EditedUserId = userDetail.Id;
                }
                if (request.IsCancel)
                {
                    order.IsCancel = request.IsCancel;
                    order.CanceledDate = request.CanceledDate;
                    order.CanceledUserId = userDetail.Id;
                    order.CanceledReason = request.CanceledReason;
                }
                order.IsSync = request.IsSync;
                order.SyncedDate = request.SyncedDate;

                var savedOrderItemBatches = await _context.OrderItemBatches.Where(y => y.OrderId == order.Id).ToListAsync();
                savedOrderItemBatches.ForEach(x =>
                {
                    request.OrderItemBatches.ToList().ForEach(async y =>
                    {
                        if (y.Id != 0 && x.Id != y.Id)
                        {
                            if (await _context.OrderItemBatches.AnyAsync(a => a.Id == x.Id))
                            {
                                var salesRepItemBatch = await _context.SalesRepItemBatches.FirstOrDefaultAsync(y => y.ItemBatchId == x.ItemBatchId);
                                salesRepItemBatch.ItemCount = salesRepItemBatch.ItemCount + x.ItemCount;
                                _context.OrderItemBatches.Remove(x);
                            }
                        }
                    });
                });

                request.OrderItemBatches.ToList().ForEach(async x =>
               {
                   var orderItemBatch = await _context.OrderItemBatches.FindAsync(x.Id);
                   var salesRepItemBatch = await _context.SalesRepItemBatches.FirstOrDefaultAsync(y => y.ItemBatchId == x.ItemBatchId);
                   var itemBatch = await _context.ItemBatches.FindAsync(x.ItemBatchId);
                   var orderItemBatchCode = order.OrderCode.Replace("odr", "") + itemBatch.ItemBatchCode.Replace("bch", "");

                   if (orderItemBatch != null)
                   {
                       //Update SalesRep Item Batch
                       salesRepItemBatch.ItemCount = (orderItemBatch.ItemCount + salesRepItemBatch.ItemCount) - x.ItemCount;
                       orderItemBatch.OrderItemBatchCode = orderItemBatchCode;
                   }
                   else
                   {
                       //Update SalesRep Item Batch
                       salesRepItemBatch.ItemCount = salesRepItemBatch.ItemCount - x.ItemCount;
                       x.OrderItemBatchCode = orderItemBatchCode;
                       x.OrderId = order.Id;
                       await _context.OrderItemBatches.AddAsync(x);
                   }

               });

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}