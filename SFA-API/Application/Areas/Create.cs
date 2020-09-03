using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Areas
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int DistrictId { get; set; }
            public string Name { get; set; }
            public string AreaCode { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var area = _mapper.Map<Command, Area>(request);
                var areaCode = "0001";

                if (_context.Areas.Any())
                {
                    areaCode = (_context.Areas.AsEnumerable().Max(x => Convert.ToInt32(x.AreaCode)) + 1).ToString("D4");
                }
                area.AreaCode = areaCode;

                await _context.Areas.AddAsync(area);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}