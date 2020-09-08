using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OrderItemBatches
{
    public class Create
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var orderItemBatch = _mapper.Map<Command, OrderItemBatch>(request);

                await _context.OrderItemBatches.AddAsync(orderItemBatch);

                //Update SalesRep Item Batch
                var salesRepItemBatch = await _context.SalesRepItemBatches.Where(x => x.ItemBatchId == request.ItemBatchId).FirstOrDefaultAsync();
                salesRepItemBatch.ItemCount = salesRepItemBatch.ItemCount - request.ItemCount;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}