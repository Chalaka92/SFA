using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Routes
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int AreaId { get; set; }
            public int StoreCount { get; set; }
            public string Name { get; set; }
            public string RouteCode { get; set; }
            public string StartLatitude { get; set; }
            public string StartLongitude { get; set; }
            public string EndLatitude { get; set; }
            public string EndLongitude { get; set; }
            public string Comment { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.StartLatitude).NotEmpty();
                RuleFor(x => x.StartLongitude).NotEmpty();
                RuleFor(x => x.EndLongitude).NotEmpty();
                RuleFor(x => x.EndLatitude).NotEmpty();
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
                var route = _mapper.Map<Command, Route>(request);
                var area = await _context.Areas.FindAsync(request.AreaId);

                var routeCode = "rtu" + area.AreaCode + "001";

                if (await _context.Routes.AnyAsync())
                {
                    routeCode = "rtu" + area.AreaCode + (_context.Routes.AsEnumerable().Where(x => x.RouteCode.Substring(0, x.RouteCode.Length - 4) == "rtu" + area.AreaCode)
                        .Max(x => Convert.ToInt32(x.RouteCode.Substring(x.RouteCode.Length - 3, 3))) + 1).ToString("D3");
                }
                route.RouteCode = routeCode;

                await _context.Routes.AddAsync(route);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}