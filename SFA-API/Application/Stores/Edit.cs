using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Stores
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int StoreManagerId { get; set; }
            public int RouteId { get; set; }
            public string StoreCode { get; set; }
            public string Name { get; set; }
            public string Comment { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedBy { get; set; }
            public virtual ICollection<StoreAddress> StoreAddresses { get; set; }
            public virtual ICollection<StoreEmail> StoreEmails { get; set; }
            public virtual ICollection<StoreContact> StoreContacts { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.StoreManagerId).GreaterThan(0);
                RuleFor(x => x.RouteId).GreaterThan(0);
                RuleFor(x => x.StoreAddresses).NotNull();
                RuleFor(x => x.StoreEmails).NotNull();
                RuleFor(x => x.StoreContacts).NotNull();
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
                var store = await _context.Stores.FindAsync(request.Id);

                if (store == null)
                    throw new RestException(HttpStatusCode.NotFound, new { store = "Not Found" });

                store.Name = request.Name ?? store.Name;
                store.Comment = request.Comment ?? store.Comment;
                store.StoreManagerId = request.StoreManagerId;
                store.RouteId = request.RouteId;

                _context.StoreAddresses.RemoveRange(_context.StoreAddresses.Where(x => x.StoreId == store.Id));
                _context.StoreEmails.RemoveRange(_context.StoreEmails.Where(x => x.StoreId == store.Id));
                _context.StoreContacts.RemoveRange(_context.StoreContacts.Where(x => x.StoreId == store.Id));

                //Address
                request.StoreAddresses.ToList().ForEach(async x =>
                {
                    x.StoreId = store.Id;
                    await _context.StoreAddresses.AddAsync(x);
                });

                //Email
                request.StoreEmails.ToList().ForEach(async x =>
                {
                    x.StoreId = store.Id;
                    await _context.StoreEmails.AddAsync(x);
                });

                //Contact
                request.StoreContacts.ToList().ForEach(async x =>
                {
                    x.StoreId = store.Id;
                    await _context.StoreContacts.AddAsync(x);
                });

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}