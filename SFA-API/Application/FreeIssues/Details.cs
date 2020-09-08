using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.FreeIssues
{
    public class Details
    {
        public class Query : IRequest<FreeIssueDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, FreeIssueDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<FreeIssueDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var freeIssue = await _context.FreeIssues.FindAsync(request.Id);

                if (freeIssue == null)
                    throw new RestException(HttpStatusCode.NotFound, new { freeIssue = "Not Found" });

                var returnFreeIssue = _mapper.Map<FreeIssue, FreeIssueDto>(freeIssue);

                return returnFreeIssue;
            }
        }
    }
}