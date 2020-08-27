using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Values
{
    public class Details
    {
        public class Query : IRequest<ValueDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ValueDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<ValueDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var value = await _context.Values.FindAsync(request.Id);

                if (value == null)
                    throw new RestException(HttpStatusCode.NotFound, new { value = "Not Found" });

                var valueToReturn = _mapper.Map<Value, ValueDto>(value);

                return valueToReturn;
            }
        }
    }
}