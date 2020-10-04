using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.StoreItemBatches
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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

                //Update Item Batch
                var itemBatch = await _context.ItemBatches.Where(x => x.Id == storeItemBatch.ItemBatchId).FirstOrDefaultAsync();
                itemBatch.ItemCount = itemBatch.ItemCount + storeItemBatch.ItemCount;

                _context.Remove(storeItemBatch);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}