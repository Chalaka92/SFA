using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Routes
{
    public class Details
    {
        public class Query : IRequest<RouteDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, RouteDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<RouteDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var route = await _context.Routes.FindAsync(request.Id);

                if (route == null)
                    throw new RestException(HttpStatusCode.NotFound, new { route = "Not Found" });

                var returnRoute = _mapper.Map<Route, RouteDto>(route);

                return returnRoute;
            }
        }
    }
}