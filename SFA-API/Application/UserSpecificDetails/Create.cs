using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.UserSpecificDetails
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public int RoleId { get; set; }
            public int AssignedAreaId { get; set; }
            public int AssignedRouteId { get; set; }
            public int AssignedStoreId { get; set; }
            public string AssignedDays { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserId).GreaterThan(0);
                RuleFor(x => x.RoleId).GreaterThan(0);
                RuleFor(x => x.AssignedAreaId).GreaterThan(0);
                RuleFor(x => x.AssignedRouteId).GreaterThan(0);
                RuleFor(x => x.AssignedStoreId).GreaterThan(0);
                RuleFor(x => x.AssignedDays).NotEmpty();
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
                var userSpecificDetail = _mapper.Map<Command, UserSpecificDetail>(request);

                await _context.UserSpecificDetails.AddAsync(userSpecificDetail);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}