using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.StoreItemBatches
{
    public class Details
    {
        public class Query : IRequest<StoreItemBatchDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, StoreItemBatchDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<StoreItemBatchDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var storeItemBatch = await _context.StoreItemBatches.FindAsync(request.Id);

                if (storeItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { storeItemBatch = "Not Found" });

                var returnStoreItemBatch = _mapper.Map<StoreItemBatch, StoreItemBatchDto>(storeItemBatch);

                return returnStoreItemBatch;
            }
        }
    }
}