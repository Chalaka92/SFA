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
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Stores
{
    public class Create
    {
        public class Command : IRequest
        {
            public string LoginEmail { get; set; }
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
                RuleFor(x => x.LoginEmail).NotEmpty();
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
                var store = _mapper.Map<Command, Store>(request);
                var route = await _context.Routes.FindAsync(request.RouteId);

                var storeCode = "str" + route.RouteCode + "01";

                if (await _context.Stores.AnyAsync(x => x.RouteId == request.RouteId))
                {
                    storeCode = "str" + route.RouteCode +
                     (_context.Stores.AsEnumerable().Where(x => x.StoreCode.Substring(0, x.StoreCode.Length - 3) == "str" + route.RouteCode)
                                          .Max(x => Convert.ToInt32(x.StoreCode.Substring(x.StoreCode.Length - 2, 2))) + 1).ToString("D2");
                }
                store.StoreCode = storeCode;

                var loginUser = await _userManager.FindByEmailAsync(request.LoginEmail);
                store.CreatedBy = loginUser.Id;

                var user = await _context.Stores.AddAsync(store);

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

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}