using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.StoreItemBatches
{
    public class ListByStoreId
    {
        public class Query : IRequest<List<StoreItemBatchDto>>
        {
            public int StoreId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<StoreItemBatchDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<StoreItemBatchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var storeItemBatches = await _context.StoreItemBatches.Where(x => x.StoreId == request.StoreId).ToListAsync();
                var returnStoreItemBatches = _mapper.Map<List<StoreItemBatch>, List<StoreItemBatchDto>>(storeItemBatches);
                if (returnStoreItemBatches == null)
                    return null;

                returnStoreItemBatches.ForEach(async x =>
                {
                    var itemBatch = await _context.ItemBatches.FindAsync(x.ItemBatchId);
                    var store = await _context.Stores.FindAsync(x.StoreId);
                    x.StoreName = store.Name;
                    x.ItemBatchName = itemBatch.Name;
                });
                return returnStoreItemBatches;
            }
        }

    }
}