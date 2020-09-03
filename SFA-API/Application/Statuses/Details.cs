using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Statuses
{
    public class Details
    {
        public class Query : IRequest<Status>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Status>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Status> Handle(Query request, CancellationToken cancellationToken)
            {
                var status = await _context.Statuses.FindAsync(request.Id);

                if (status == null)
                    throw new RestException(HttpStatusCode.NotFound, new { status = "Not Found" });

                return status;
            }
        }
    }
}