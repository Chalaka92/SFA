using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Shops
{
    public class Details
    {
        public class Query : IRequest<ShopDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ShopDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<ShopDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var shop = await _context.Shops.FindAsync(request.Id);

                if (shop == null)
                    throw new RestException(HttpStatusCode.NotFound, new { shop = "Not Found" });

                var returnShop = _mapper.Map<Shop, ShopDto>(shop);

                return returnShop;
            }
        }
    }
}