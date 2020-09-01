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
        public class Query : IRequest<Route>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Route>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Route> Handle(Query request, CancellationToken cancellationToken)
            {
                var route = await _context.Routes.FindAsync(request.Id);

                if (route == null)
                    throw new RestException(HttpStatusCode.NotFound, new { route = "Not Found" });

                return route;
            }
        }
    }
}