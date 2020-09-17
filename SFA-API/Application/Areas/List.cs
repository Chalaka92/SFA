using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Areas
{
    public class List
    {
        public class Query : IRequest<List<AreaDto>> { }

        public class Handler : IRequestHandler<Query, List<AreaDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<AreaDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var areas = await _context.Areas.ToListAsync();
                var returnAreas = _mapper.Map<List<Area>, List<AreaDto>>(areas);
                if (returnAreas == null)
                    return null;

                returnAreas.ForEach(async x =>
                {
                    var district = await _context.Districts.FindAsync(x.DistrictId);
                    x.DistrictName = district.Name;
                    x.ProvinceId = district.ProvinceId;
                });
                return returnAreas;
            }
        }

    }
}