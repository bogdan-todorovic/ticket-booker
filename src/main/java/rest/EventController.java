package rest;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import model.Event;
import service.EventService;

@RestController
public class EventController {

	@Autowired
	private EventService eventService;

	@RequestMapping(method = RequestMethod.POST, value = "/establishments/{establishmentId}/events")
	public ResponseEntity<?> createEvent(@PathVariable Integer establishmentId, @RequestBody Event event) {
		Event createdEvent = eventService.createEvent(establishmentId, event);
		if (createdEvent == null) {
			return ResponseEntity.notFound().build();
		}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(createdEvent.getId()).toUri();
		return ResponseEntity.created(location).body(createdEvent);
	}
}
