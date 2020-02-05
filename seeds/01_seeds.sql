-- INSERT INTO users (id, name, email, password)
-- VALUES (1, 'Tina Turner', 'tinaturner@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
-- (2, 'Bob Smith', 'smithbobbyr@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
-- (3, 'Kelly Rowland', 'krowland@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

-- INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url,
-- cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
-- VALUES (1, 2, 'Speed Lamp', 'description', 'https://www.pexels.com/photo/home-real-estate-106399/', 'https://www.pexels.com/photo/home-real-estate-106399/', 100, 2, 4, 5, 'Canada', 'Homer', 'Vancouver', 'BC', 'V43DW2', true ),
-- (2, 1, 'New Apartment', 'description', 'https://www.pexels.com/photo/home-real-estate-106399/', 'https://www.pexels.com/photo/home-real-estate-106399/', 150, 4, 4, 6, 'Canada', 'Elwell', 'Burnaby', 'BC', 'V4R322', true ),
-- (3, 3, 'Bombolcat', 'description', 'https://www.pexels.com/photo/home-real-estate-106399/', 'https://www.pexels.com/photo/home-real-estate-106399/', 50, 1, 1, 1, 'Canada', 'Grouse', 'Vancouver', 'BC', 'V43S12', true )

-- INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) 
-- VALUES (1, 1, 2, '2018-09-11', '2018-09-26'),
-- (2, 2, 1, '2019-01-04', '2019-02-01'),
-- (3, 3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 2, 1, 4, 'Great'), 
(2, 2, 1, 2, 5, 'Excellent'), 
(3, 3, 3, 3, 2, 'Horrible');