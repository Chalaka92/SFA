using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Districts
{
    public class Details
    {
        public class Query : IRequest<District>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, District>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<District> Handle(Query request, CancellationToken cancellationToken)
            {
                var district = await _context.Districts.FindAsync(request.Id);

                if (district == null)
                    throw new RestException(HttpStatusCode.NotFound, new { district = "Not Found" });

                return district;
            }
        }
    }
}