using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Targets
{
    public class Details
    {
        public class Query : IRequest<TargetDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, TargetDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<TargetDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var target = await _context.Targets.FindAsync(request.Id);

                if (target == null)
                    throw new RestException(HttpStatusCode.NotFound, new { target = "Not Found" });

                var returnTarget = _mapper.Map<Target, TargetDto>(target);

                return returnTarget;
            }
        }
    }
}