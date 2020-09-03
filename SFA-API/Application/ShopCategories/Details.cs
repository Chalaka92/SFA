using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.ShopCategories
{
    public class Details
    {
        public class Query : IRequest<ShopCategory>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ShopCategory>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<ShopCategory> Handle(Query request, CancellationToken cancellationToken)
            {
                var shopCategory = await _context.ShopCategories.FindAsync(request.Id);

                if (shopCategory == null)
                    throw new RestException(HttpStatusCode.NotFound, new { shopCategory = "Not Found" });

                return shopCategory;
            }
        }
    }
}