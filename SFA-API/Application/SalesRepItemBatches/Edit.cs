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

namespace Application.SalesRepItemBatches
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public int ItemBatchId { get; set; }
            public int ItemCount { get; set; }
            public int StoreId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserId).GreaterThan(0);
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
                var salesRepItemBatch = await _context.SalesRepItemBatches.FindAsync(request.Id);

                if (salesRepItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { salesRepItemBatch = "Not Found" });

                //Update Store Item Batch
                var storeItemBatch = await _context.StoreItemBatches.Where(x => x.ItemBatchId == request.ItemBatchId).FirstOrDefaultAsync();
                storeItemBatch.ItemCount = (storeItemBatch.ItemCount + salesRepItemBatch.ItemCount) - request.ItemCount;

                salesRepItemBatch.UserId = request.UserId == 0 ? salesRepItemBatch.UserId : request.UserId;
                salesRepItemBatch.ItemBatchId = request.ItemBatchId == 0 ? salesRepItemBatch.ItemBatchId : request.ItemBatchId;
                salesRepItemBatch.ItemCount = request.ItemCount == 0 ? salesRepItemBatch.ItemCount : request.ItemCount;
                salesRepItemBatch.StoreId = request.StoreId == 0 ? salesRepItemBatch.StoreId : request.StoreId;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}