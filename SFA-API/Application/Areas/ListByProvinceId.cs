using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Areas
{
    public class ListByDistrictId
    {
        public class Query : IRequest<List<Area>>
        {
            public int DistrictId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Area>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Area>> Handle(Query request, CancellationToken cancellationToken)
            {
                var areas = await _context.Areas.Where(x => x.DistrictId == request.DistrictId).ToListAsync();
                return areas;
            }
        }

    }
}