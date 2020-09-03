using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Shops
{
    public class Create
    {
        public class Command : IRequest
        {
            public string LoginEmail { get; set; }
            public int Id { get; set; }
            public int ShopOwnerId { get; set; }
            public int StatusId { get; set; }
            public int ShopCategoryId { get; set; }
            public int RouteId { get; set; }
            public string ShopCode { get; set; }
            public string Name { get; set; }
            public string Comment { get; set; }
            public decimal ArrearsAmount { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedBy { get; set; }
            public virtual ICollection<ShopAddress> ShopAddresses { get; set; }
            public virtual ICollection<ShopEmail> ShopEmails { get; set; }
            public virtual ICollection<ShopContact> ShopContacts { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.LoginEmail).NotEmpty();
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
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var shop = _mapper.Map<Command, Shop>(request);
                var route = await _context.Routes.FindAsync(request.RouteId);

                var shopCode = "shp" + route.RouteCode + "01";

                if (_context.Shops.Any())
                {
                    shopCode = "shp" + route.RouteCode +
                     (_context.Shops.AsEnumerable()
                                          .Max(x => Convert.ToInt32(x.ShopCode.Substring(x.ShopCode.Length - 2, 2))) + 1).ToString("D2");
                }
                shop.ShopCode = shopCode;

                var loginUser = await _userManager.FindByEmailAsync(request.LoginEmail);
                shop.CreatedBy = loginUser.Id;

                var user = await _context.Shops.AddAsync(shop);

                //Address
                shop.ShopAddresses.ToList().ForEach(async x =>
                {
                    x.ShopId = shop.Id;
                    await _context.ShopAddresses.AddAsync(x);
                });

                //Email
                shop.ShopEmails.ToList().ForEach(async x =>
                {
                    x.ShopId = shop.Id;
                    await _context.ShopEmails.AddAsync(x);
                });

                //Contact
                shop.ShopContacts.ToList().ForEach(async x =>
                {
                    x.ShopId = shop.Id;
                    await _context.ShopContacts.AddAsync(x);
                });
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}