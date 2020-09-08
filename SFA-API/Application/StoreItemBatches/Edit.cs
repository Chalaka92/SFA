using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.StoreItemBatches
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int StoreId { get; set; }
            public int ItemBatchId { get; set; }
            public int ItemCount { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.StoreId).GreaterThan(0);
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
                var storeItemBatch = await _context.StoreItemBatches.FindAsync(request.Id);

                if (storeItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { storeItemBatch = "Not Found" });

                storeItemBatch.StoreId = request.StoreId == 0 ? storeItemBatch.StoreId : request.StoreId;
                storeItemBatch.ItemBatchId = request.ItemBatchId == 0 ? storeItemBatch.ItemBatchId : request.ItemBatchId;
                storeItemBatch.ItemCount = request.ItemCount == 0 ? storeItemBatch.ItemCount : request.ItemCount;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}