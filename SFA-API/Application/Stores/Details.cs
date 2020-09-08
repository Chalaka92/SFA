using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Stores
{
    public class Details
    {
        public class Query : IRequest<StoreDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, StoreDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<StoreDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var store = await _context.Stores.FindAsync(request.Id);

                if (store == null)
                    throw new RestException(HttpStatusCode.NotFound, new { store = "Not Found" });

                var returnStore = _mapper.Map<Store, StoreDto>(store);

                return returnStore;
            }
        }
    }
}