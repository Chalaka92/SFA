using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Districts
{
    public class ListByProvinceId
    {
        public class Query : IRequest<List<District>>
        {
            public int ProvinceId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<District>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<District>> Handle(Query request, CancellationToken cancellationToken)
            {
                var districts = await _context.Districts.Where(x => x.ProvinceId == request.ProvinceId).ToListAsync();
                return districts;
            }
        }

    }
}