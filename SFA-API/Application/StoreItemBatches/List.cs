using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.StoreItemBatches
{
    public class List
    {
        public class Query : IRequest<List<StoreItemBatchDto>> { }

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
                var storeItemBatches = await _context.StoreItemBatches.ToListAsync();
                var returnStoreItemBatches = _mapper.Map<List<StoreItemBatch>, List<StoreItemBatchDto>>(storeItemBatches);

                return returnStoreItemBatches;
            }
        }

    }
}