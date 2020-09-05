using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.UserSpecificDetails
{
    public class Edit
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var userSpecificDetail = await _context.UserSpecificDetails.FindAsync(request.Id);

                if (userSpecificDetail == null)
                    throw new RestException(HttpStatusCode.NotFound, new { userSpecificDetail = "Not Found" });

                userSpecificDetail.AssignedDays = request.AssignedDays ?? userSpecificDetail.AssignedDays;
                userSpecificDetail.UserId = request.UserId == 0 ? userSpecificDetail.UserId : request.UserId;
                userSpecificDetail.RoleId = request.RoleId == 0 ? userSpecificDetail.RoleId : request.RoleId;
                userSpecificDetail.AssignedAreaId = request.AssignedAreaId == 0 ? userSpecificDetail.AssignedAreaId : request.AssignedAreaId;
                userSpecificDetail.AssignedRouteId = request.AssignedRouteId == 0 ? userSpecificDetail.AssignedRouteId : request.AssignedRouteId;
                userSpecificDetail.AssignedStoreId = request.AssignedStoreId == 0 ? userSpecificDetail.AssignedStoreId : request.AssignedStoreId;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}