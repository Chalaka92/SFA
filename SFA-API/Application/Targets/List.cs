using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Targets
{
    public class List
    {
        public class Query : IRequest<List<TargetDto>> { }

        public class Handler : IRequestHandler<Query, List<TargetDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<TargetDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var targets = await _context.Targets.ToListAsync();
                var returnTargets = _mapper.Map<List<Target>, List<TargetDto>>(targets);

                return returnTargets;
            }
        }

    }
}