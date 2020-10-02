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

namespace Application.Shops
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int ShopOwnerId { get; set; }
            public int StatusId { get; set; }
            public int ShopCategoryId { get; set; }
            public int RouteId { get; set; }
            public string ShopCode { get; set; }
            public string Name { get; set; }
            public string Comment { get; set; }
            public decimal ArrearsAmount { get; set; }
            public virtual ICollection<ShopAddress> ShopAddresses { get; set; }
            public virtual ICollection<ShopEmail> ShopEmails { get; set; }
            public virtual ICollection<ShopContact> ShopContacts { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.ShopCategoryId).GreaterThan(0);
                RuleFor(x => x.ShopOwnerId).GreaterThan(0);
                RuleFor(x => x.RouteId).GreaterThan(0);
                RuleFor(x => x.StatusId).GreaterThan(0);
                RuleFor(x => x.ShopAddresses).NotNull();
                RuleFor(x => x.ShopEmails).NotNull();
                RuleFor(x => x.ShopContacts).NotNull();
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
                var shop = await _context.Shops.FindAsync(request.Id);

                if (shop == null)
                    throw new RestException(HttpStatusCode.NotFound, new { shop = "Not Found" });

                shop.Name = request.Name ?? shop.Name;
                shop.Comment = request.Comment ?? shop.Comment;
                shop.ArrearsAmount = request.ArrearsAmount;
                shop.ShopOwnerId = request.ShopOwnerId;
                shop.StatusId = shop.StatusId;
                shop.ShopCategoryId = request.ShopCategoryId;
                shop.RouteId = request.RouteId;

                _context.ShopAddresses.RemoveRange(_context.ShopAddresses.Where(x => x.ShopId == shop.Id));
                _context.ShopEmails.RemoveRange(_context.ShopEmails.Where(x => x.ShopId == shop.Id));
                _context.ShopContacts.RemoveRange(_context.ShopContacts.Where(x => x.ShopId == shop.Id));

                //Address
                request.ShopAddresses.ToList().ForEach(async x =>
                {
                    x.ShopId = shop.Id;
                    await _context.ShopAddresses.AddAsync(x);
                });

                //Email
                request.ShopEmails.ToList().ForEach(async x =>
                {
                    x.ShopId = shop.Id;
                    await _context.ShopEmails.AddAsync(x);
                });

                //Contact
                request.ShopContacts.ToList().ForEach(async x =>
                {
                    x.ShopId = shop.Id;
                    await _context.ShopContacts.AddAsync(x);
                });

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}