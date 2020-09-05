using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Areas
{
    public class Details
    {
        public class Query : IRequest<AreaDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AreaDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<AreaDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var area = await _context.Areas.FindAsync(request.Id);

                if (area == null)
                    throw new RestException(HttpStatusCode.NotFound, new { area = "Not Found" });

                var returnArea = _mapper.Map<Area, AreaDto>(area);

                return returnArea;
            }
        }
    }
}