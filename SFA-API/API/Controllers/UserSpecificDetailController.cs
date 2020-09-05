using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.UserSpecificDetails;

namespace API.Controllers
{
    public class UserSpecificController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<UserSpecificDetail>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("ListByLoggedUser/{loginEmail}")]
        public async Task<ActionResult<List<UserSpecificDetail>>> ListByLoggedUser(string loginEmail)
        {
            return await Mediator.Send(new ListByLoggedUser.Query { LoginEmail = loginEmail });
        }

        [HttpGet("Details/{id}")]
        public async Task<ActionResult<UserSpecificDetail>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}