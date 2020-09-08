using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ShopItemBatches
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int ShopId { get; set; }
            public int ItemBatchId { get; set; }
            public int ItemCount { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ShopId).GreaterThan(0);
                RuleFor(x => x.ItemBatchId).GreaterThan(0);
                RuleFor(x => x.ItemCount).GreaterThan(0);
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
                var shopItemBatch = await _context.ShopItemBatches.FindAsync(request.Id);

                if (shopItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { shopItemBatch = "Not Found" });

                shopItemBatch.ShopId = request.ShopId == 0 ? shopItemBatch.ShopId : request.ShopId;
                shopItemBatch.ItemBatchId = request.ItemBatchId == 0 ? shopItemBatch.ItemBatchId : request.ItemBatchId;
                shopItemBatch.ItemCount = request.ItemCount == 0 ? shopItemBatch.ItemCount : request.ItemCount;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}