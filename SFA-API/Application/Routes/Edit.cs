using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Routes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int AreaId { get; set; }
            public int StoreCount { get; set; }
            public string Name { get; set; }
            public decimal StartLatitude { get; set; }
            public decimal StartLongitude { get; set; }
            public decimal EndLatitude { get; set; }
            public decimal EndLongitude { get; set; }
            public string Comment { get; set; }
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var route = await _context.Routes.FindAsync(request.Id);

                if (route == null)
                    throw new RestException(HttpStatusCode.NotFound, new { route = "Not Found" });

                route.Name = request.Name ?? route.Name;
                route.AreaId = request.AreaId == 0 ? route.AreaId : request.AreaId;
                route.StoreCount = request.StoreCount == 0 ? route.StoreCount : request.StoreCount;
                route.StartLatitude = request.StartLatitude;
                route.StartLongitude = request.StartLongitude;
                route.EndLatitude = request.EndLatitude;
                route.EndLongitude = request.EndLongitude;
                route.Comment = request.Comment ?? route.Comment;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}