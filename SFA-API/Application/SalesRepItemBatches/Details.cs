using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.SalesRepItemBatches
{
    public class Details
    {
        public class Query : IRequest<SalesRepItemBatchDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, SalesRepItemBatchDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<SalesRepItemBatchDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var salesRepItemBatch = await _context.SalesRepItemBatches.FindAsync(request.Id);

                if (salesRepItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { salesRepItemBatch = "Not Found" });

                var returnSalesRepItemBatch = _mapper.Map<SalesRepItemBatch, SalesRepItemBatchDto>(salesRepItemBatch);

                return returnSalesRepItemBatch;
            }
        }
    }
}