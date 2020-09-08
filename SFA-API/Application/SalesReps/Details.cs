using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.SalesReps
{
    public class Details
    {
        public class Query : IRequest<SalesRepDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, SalesRepDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<SalesRepDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var salesRep = await _context.SalesReps.FindAsync(request.Id);

                if (salesRep == null)
                    throw new RestException(HttpStatusCode.NotFound, new { salesRep = "Not Found" });

                var returnSalesRep = _mapper.Map<SalesRep, SalesRepDto>(salesRep);

                return returnSalesRep;
            }
        }
    }
}