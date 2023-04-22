from datetime import timedelta
import random
from faker import Faker
import pandas as pd

faker = Faker()

def short_uuid():
    return faker.uuid4()[:10]

def create_airplanes(num, company_ids):
    models = ["Airbus A320", "Boeing 737", "Airbus A380", "Boeing 777", "Boeing 787", "Airbus A350", "Boeing 767"]
    airplanes = []
    for _ in range(num):
        airplanes.append([short_uuid(), f"{random.choice(models)} {faker.bothify('####', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ')}", random.choice(models), faker.year(), random.choice(company_ids)])
    return airplanes

def create_companies():
    companies = [
        ['c0', 'Turkish Airlines', 'Turkey'],
        ['c1', 'Delta Air Lines', 'United States'],
        ['c2', 'United Airlines', 'United States'],
        ['c3', 'Southwest Airlines', 'United States'],
        ['c4', 'Air China', 'China'],
        ['c5', 'British Airways', 'United Kingdom'],
        ['c6', 'Emirates', 'United Arab Emirates'],
        ['c7', 'Lufthansa', 'Germany'],
        ['c8', 'Air France', 'France'],
        ['c9', 'Qantas', 'Australia']
    ]
    return companies

def create_airports():
    airports = [
        ['a0', 'Hartsfield-Jackson Atlanta International Airport', 'Atlanta', 'United States'],
        ['a1', 'Beijing Capital International Airport', 'Beijing', 'China'],
        ['a2', 'Los Angeles International Airport', 'Los Angeles', 'United States'],
        ['a3', 'Tokyo Haneda Airport', 'Tokyo', 'Japan'],
        ['a4', 'Dubai International Airport', 'Dubai', 'United Arab Emirates'],
        ['a5', 'Chicago O\'Hare International Airport', 'Chicago', 'United States'],
        ['a6', 'London Heathrow Airport', 'London', 'United Kingdom'],
        ['a7', 'Shanghai Pudong International Airport', 'Shanghai', 'China'],
        ['a8', 'Charles de Gaulle Airport', 'Paris', 'France'],
        ['a9', 'Amsterdam Schiphol Airport', 'Amsterdam', 'Netherlands'],
        ['a10', 'Dallas/Fort Worth International Airport', 'Dallas', 'United States'],
        ['a11', 'Hong Kong International Airport', 'Hong Kong', 'China'],
        ['a12', 'Denver International Airport', 'Denver', 'United States'],
        ['a13', 'Singapore Changi Airport', 'Singapore', 'Singapore'],
        ['a14', 'Suvarnabhumi Airport', 'Bangkok', 'Thailand'],
        ['a15', 'John F. Kennedy International Airport', 'New York', 'United States'],
        ['a16', 'Kuala Lumpur International Airport', 'Kuala Lumpur', 'Malaysia'],
        ['a17', 'San Francisco International Airport', 'San Francisco', 'United States'],
        ['a18', 'Madrid Barajas Airport', 'Madrid', 'Spain'],
        ['a19', 'Chhatrapati Shivaji International Airport', 'Mumbai', 'India'],
        ['a20', 'Seoul Incheon International Airport', 'Seoul', 'South Korea'],
        ['a21', 'Toronto Pearson International Airport', 'Toronto', 'Canada'],
        ['a22', 'Sydney Kingsford-Smith Airport', 'Sydney', 'Australia'],
        ['a23', 'Frankfurt Airport', 'Frankfurt', 'Germany'],
        ['a24', 'Istanbul Ataturk Airport', 'Istanbul', 'Turkey'],
        ['a25', 'Soekarno-Hatta International Airport', 'Jakarta', 'Indonesia'],
        ['a26', 'Cairo International Airport', 'Cairo', 'Egypt'],
        ['a27', 'Melbourne Airport', 'Melbourne', 'Australia'],
        ['a28', 'Miami International Airport', 'Miami', 'United States'],
        ['a29', 'Orlando International Airport', 'Orlando', 'United States'],
        ['a30', 'Washington Dulles International Airport', 'Washington, D.C.', 'United States'],
        ['a31', 'Rio de Janeiro/Galeão-Antonio Carlos Jobim International Airport', 'Rio de Janeiro', 'Brazil'],
        ['a32', 'Jorge Chávez International Airport', 'Lima', 'Peru'],
        ['a33', 'Sheremetyevo International Airport', 'Moscow', 'Russia'],
        ['a34', 'Barcelona El Prat Airport', 'Barcelona', 'Spain'],
        ['a35', 'Munich Airport', 'Munich', 'Germany'],
        ['a36', 'Zurich Airport', 'Zurich', 'Switzerland'],
        ['a37', 'Indira Gandhi International Airport', 'New Delhi', 'India'],
        ['a38', 'Ben Gurion Airport', 'Tel Aviv', 'Israel'],
        ['a39', 'Leonardo da Vinci–Fiumicino Airport', 'Rome', 'Italy'],
        ['a40', 'Brussels Airport', 'Brussels', 'Belgium'],
        ['a41', 'Vienna International Airport', 'Vienna', 'Austria'],
        ['a42', "O'Hare International Airport", 'Chicago', 'United States'],
        ['a43', 'Minneapolis-Saint Paul International Airport', 'Minneapolis', 'United States'],
        ['a44', 'Detroit Metropolitan Airport', 'Detroit', 'United States'],
        ['a45', 'McCarran International Airport', 'Las Vegas', 'United States'],
        ['a46', 'Charlotte Douglas International Airport', 'Charlotte', 'United States'],
        ['a47', 'Phoenix Sky Harbor International Airport', 'Phoenix', 'United States'],
        ['a48', 'Salt Lake City International Airport', 'Salt Lake City', 'United States'],
        ['a49', 'Seattle-Tacoma International Airport', 'Seattle', 'United States'],
        ['a50', 'Brisbane Airport', 'Brisbane', 'Australia'],
        ['a51', 'Vancouver International Airport', 'Vancouver', 'Canada'],
        ['a52', 'Calgary International Airport', 'Calgary', 'Canada'],
        ['a53', 'Montreal-Pierre Elliott Trudeau International Airport', 'Montreal', 'Canada'],
        ['a54', 'Lisbon Portela Airport', 'Lisbon', 'Portugal'],
        ['a55', 'Athens International Airport', 'Athens', 'Greece'],
        ['a56', 'Dublin Airport', 'Dublin', 'Ireland'],
        ['a57', 'Incheon International Airport', 'Incheon', 'South Korea'],
        ['a58', 'Changi Airport', 'Singapore', 'Singapore'],
        ['a59', 'Lester B. Pearson International Airport', 'Toronto', 'Canada'],
        ['a60', 'São Paulo-Guarulhos International Airport', 'São Paulo', 'Brazil']
        ]
    return airports

def create_customers(num):
    customers = []
    for _ in range(num):
        phone_number = f"0{random.randint(300000000, 899999999)}"
        customers.append([short_uuid(), faker.name(), faker.email(), phone_number])
    return customers

def create_pilots(num, route_ids, company_ids):
    pilots = []
    for _ in range(num):
        pilots.append([short_uuid(), faker.name(), random.choice(route_ids), random.randint(1, 30), random.choice(company_ids)])
    return pilots

def create_routes(num, airport_ids):
    routes = []
    while len(routes) < num:
        departure_airport = random.choice(airport_ids)
        arrival_airport = random.choice(airport_ids)
        while departure_airport == arrival_airport:
            arrival_airport = random.choice(airport_ids)
        route = (departure_airport, arrival_airport)
        if route not in routes:
            routes.append(route)

    output = []
    for r in routes:
        output.append([short_uuid(), r[0], r[1]])
    return output


def create_flights(num, route_ids, company_ids, pilot_ids, airplane_ids):
    flights = []
    for _ in range(num):
        flight_status = "executed" if random.random() > 0.05 else "cancelled"
        departure_time = faker.date_time_this_year()
        arrival_time = departure_time + timedelta(hours=random.randint(1, 19))
        flights.append([short_uuid(), departure_time, arrival_time, random.choice(route_ids), random.choice(company_ids), random.choice(pilot_ids), random.choice(airplane_ids), flight_status])
    return flights


def create_flight_tickets(num, flight_ids):
    flight_tickets = []
    for _ in range(num):
        flight_id = random.choice(flight_ids)
        class_prob = random.random()
        if class_prob <= 0.83:
            class_type = 'economy'
            price = random.randint(10, 20) * 50
        elif class_prob <= 0.99:
            class_type = 'business'
            price = random.randint(40, 100) * 50
        else:
            class_type = 'first'
            price = random.randint(600, 1000) * 50
        flight_tickets.append([short_uuid(), flight_id, class_type, price])
    return flight_tickets

def create_bookings(num, flight_ticket_data, customer_ids, flights_data):
    bookings = []
    flight_id_to_status = {flight[0]: flight[-1] for flight in flights_data}
    for _ in range(num):
        ticket_id, flight_id, _, _ = random.choice(flight_ticket_data)
        customer_id = random.choice(customer_ids)
        flight_status = flight_id_to_status[flight_id]
        fly_status = "success" if flight_status == "executed" and random.random() > 0.07 else "missing"
        bookings.append([short_uuid(), ticket_id, customer_id, fly_status])
    return bookings

def check_unique_ids(filename, id_column):
    csv_file = pd.read_csv(filename)
    if len(csv_file[id_column]) == len(set(csv_file[id_column])):
        return False

def check_all_csv_files_unique_ids():
    files = ['companies.csv', 'airports.csv', 'customers.csv', 'pilots.csv', 'routes.csv', 'flights.csv', 'flight_tickets.csv', 'bookings.csv', 'airplanes.csv']
    id_columns = ['company_id', 'airport_id', 'customer_id', 'pilot_id', 'route_id', 'flight_id', 'ticket_id', 'booking_id', 'airplane_id']
    for i, file in enumerate(files):
        csv_file = pd.read_csv(file,  id_columns[i])
        if len(csv_file[id_columns[i]]) != len(set(csv_file[id_columns[i]])):
            print('File: ', file, ' has duplicate tuples.')
            return False
    return True


num_companies = 10
num_airports = 60
num_customers = 10000
num_pilots = 100
num_routes = 800
num_flights = 1000
num_flight_tickets = 20000
num_bookings = 20000
num_airplanes = 60

counter = 0

while True:
    
    counter += 1

    companies_data = create_companies()
    airports_data = create_airports()
    customers_data = create_customers(num_customers)
    routes_data = create_routes(num_routes, [record[0] for record in airports_data])
    pilots_data = create_pilots(num_pilots, [record[0] for record in routes_data], [record[0] for record in companies_data])
    airplanes_data = create_airplanes(num_airplanes, [record[0] for record in companies_data])
    flights_data = create_flights(num_flights, [record[0] for record in routes_data], [record[0] for record in companies_data], [record[0] for record in pilots_data], [record[0] for record in airplanes_data])
    flight_tickets_data = create_flight_tickets(num_flight_tickets, [record[0] for record in flights_data])
    bookings_data = create_bookings(num_bookings, flight_tickets_data, [record[0] for record in customers_data], flights_data)
    
    pd.DataFrame(companies_data, columns=['company_id', 'name', 'country']).to_csv('companies.csv', index=False)
    pd.DataFrame(airports_data, columns=['airport_id', 'name', 'location', 'country']).to_csv('airports.csv', index=False)
    pd.DataFrame(customers_data, columns=['customer_id', 'name', 'email', 'phone']).to_csv('customers.csv', index=False)
    pd.DataFrame(pilots_data, columns=['pilot_id', 'name', 'fav_route_id', 'experience_years', 'company_id']).to_csv('pilots.csv', index=False)
    pd.DataFrame(routes_data, columns=['route_id', 'departure_airport', 'arrival_airport']).to_csv('routes.csv', index=False)
    pd.DataFrame(flights_data, columns=['flight_id', 'departure', 'arrival', 'route_id', 'company_id', 'pilot_id', 'airplane_id', 'status']).to_csv('flights.csv', index=False)
    pd.DataFrame(flight_tickets_data, columns=['ticket_id', 'flight_id', 'class_type', 'price']).to_csv('flight_tickets.csv', index=False)
    pd.DataFrame(bookings_data, columns=['booking_id', 'ticket_id', 'customer_id', 'fly_status']).to_csv('bookings.csv', index=False)
    pd.DataFrame(airplanes_data, columns=['airplane_id', 'name', 'model', 'year_of_service', 'company_id']).to_csv('airplanes.csv', index=False)

    if check_all_csv_files_unique_ids():
        break
    
    if counter > 100000:
        print('Fatal error, check the code!')
        break
