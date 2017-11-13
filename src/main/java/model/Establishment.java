package model;

import enums.EstablishmentType;

public class Establishment {

	private int id;
	private int name;
	private String address;
	private String city;
	private EstablishmentType type;
	private User admin;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getName() {
		return name;
	}
	public void setName(int name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public EstablishmentType getType() {
		return type;
	}
	public void setType(EstablishmentType type) {
		this.type = type;
	}
	public User getAdmin() {
		return admin;
	}
	public void setAdmin(User admin) {
		this.admin = admin;
	}
	
}