using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OrderItemBatches
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int OrderId { get; set; }
            public int ItemBatchId { get; set; }
            public string OrderItembatchCode { get; set; }
            public string Name { get; set; }
            public int ItemCount { get; set; }
            public decimal SellingToShopOwnerAmount { get; set; }
            public decimal ShopOwnerProfitAmount { get; set; }
            public decimal CompanyProfitAmount { get; set; }
            public decimal CompanyDiscountRate { get; set; }
            public decimal ShopOwnerDiscountRate { get; set; }
            public bool IsSpecialDiscountHave { get; set; }
            public int CustomerFreeIssueQuantity { get; set; }
            public int ShopOwnerFreeIssueQuantity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.OrderId).GreaterThan(0);
                RuleFor(x => x.ItemBatchId).GreaterThan(0);
                RuleFor(x => x.ItemCount).GreaterThan(0);
                RuleFor(x => x.Name).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var orderItemBatch = await _context.OrderItemBatches.FindAsync(request.Id);

                if (orderItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { orderItemBatch = "Not Found" });

                //Update SalesRep Item Batch
                var salesRepItemBatch = await _context.SalesRepItemBatches.Where(x => x.ItemBatchId == request.ItemBatchId).FirstOrDefaultAsync();
                salesRepItemBatch.ItemCount = (orderItemBatch.ItemCount + salesRepItemBatch.ItemCount - request.ItemCount);

                orderItemBatch.OrderId = request.OrderId == 0 ? orderItemBatch.OrderId : request.OrderId;
                orderItemBatch.ItemBatchId = request.ItemBatchId == 0 ? orderItemBatch.ItemBatchId : request.ItemBatchId;
                orderItemBatch.ItemCount = request.ItemCount == 0 ? orderItemBatch.ItemCount : request.ItemCount;
                orderItemBatch.Name = request.Name ?? orderItemBatch.Name;
                orderItemBatch.SellingToShopOwnerAmount = request.SellingToShopOwnerAmount;
                orderItemBatch.ShopOwnerProfitAmount = request.ShopOwnerProfitAmount;
                orderItemBatch.CompanyProfitAmount = request.CompanyProfitAmount;
                orderItemBatch.CompanyDiscountRate = request.CompanyDiscountRate;
                orderItemBatch.ShopOwnerDiscountRate = request.ShopOwnerDiscountRate;
                orderItemBatch.IsSpecialDiscountHave = request.IsSpecialDiscountHave;
                orderItemBatch.CustomerFreeIssueQuantity = request.CustomerFreeIssueQuantity;
                orderItemBatch.ShopOwnerFreeIssueQuantity = request.ShopOwnerFreeIssueQuantity;

                //Update Order
                var order = await _context.Orders.FindAsync(orderItemBatch.OrderId);
                var alterTotalAmount = (request.SellingToShopOwnerAmount * request.ItemCount) - (orderItemBatch.SellingToShopOwnerAmount * orderItemBatch.ItemCount); ;
                order.TotalAmount += alterTotalAmount;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}