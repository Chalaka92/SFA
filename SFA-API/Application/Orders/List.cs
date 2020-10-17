using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class List
    {
        public class Query : IRequest<List<OrderDto>> { }

        public class Handler : IRequestHandler<Query, List<OrderDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<OrderDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = await _context.Orders.ToListAsync();
                var returnOrders = _mapper.Map<List<Order>, List<OrderDto>>(orders);
                if (returnOrders == null)
                    return null;

                returnOrders.ForEach(async x =>
                {
                    var shop = await _context.Shops.FindAsync(x.ShopId);
                    var user = await _context.UserDetails.FindAsync(x.UserId);
                    x.ShopName = shop.Name;
                    x.SalesRepName = user.FirstName + ' ' + user.LastName;
                });
                return returnOrders;
            }
        }

    }
}