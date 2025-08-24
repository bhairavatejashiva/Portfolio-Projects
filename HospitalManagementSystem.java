package com.learnJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;

public class HospitalManagementSystem {

    private static final String url = "jdbc:mysql://localhost:3306/hospital";
    private static final String username = "root";
    private static final String password = "9396556808";

    public static void main(String[] args) {
        try {
            // Load MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        Scanner scanner = new Scanner(System.in);

        try {
            // Establish connection to the database
            Connection connection = DriverManager.getConnection(url, username, password);

            // Create Patient and Doctor objects
            Patient patient = new Patient(connection, scanner);
            Doctor doctor = new Doctor(connection);

            // Main menu loop
            while (true) {
                System.out.println("\nHospital Management System");
                System.out.println("1. Add Patient");
                System.out.println("2. View Patients");
                System.out.println("3. View Doctors");
                System.out.println("4. Book Appointments");
                System.out.println("5. Exit");
                System.out.print("Please enter your choice: ");

                int choice = scanner.nextInt();
                switch (choice) {
                    case 1:
                        patient.addPatient();
                        break;
                    case 2:
                        patient.viewPatients();
                        break;
                    case 3:
                        doctor.viewDoctors();
                        break;
                    case 4:
                        bookAppointment(patient, doctor, connection, scanner);
                        break;
                    case 5:
                        System.out.println("Thank you for using Hospital Management System!");
                        return; // Exit the main method and the program
                    default:
                        System.out.println("Please enter a valid input.");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            scanner.close(); // It's good practice to close the scanner
        }
    }

    // Book Appointment Method
    public static void bookAppointment(Patient patient, Doctor doctor, Connection connection, Scanner scanner) {
        // Get patient and doctor IDs and appointment date
        System.out.print("Please Enter Patient ID: ");
        int patientId = scanner.nextInt();

        System.out.print("Please Enter Doctor ID: ");
        int doctorId = scanner.nextInt();

        System.out.print("Please Enter Appointment Date (YYYY-MM-DD): ");
        String appointmentDate = scanner.next();

        try {
            // Check if both patient and doctor exist
            if (patient.getPatientByID(patientId) && doctor.getDoctorByID(doctorId)) {
                // Check doctor availability
                if (checkDoctorAvailability(doctorId, appointmentDate, connection)) {
                    // Prepare appointment insertion
                    String appointmentQuery = "INSERT INTO appointments (patients_id, doctor_id, appointment_date) VALUES (?, ?, ?)";
                    PreparedStatement preparedStatement = connection.prepareStatement(appointmentQuery);
                    preparedStatement.setInt(1, patientId);
                    preparedStatement.setInt(2, doctorId);
                    preparedStatement.setString(3, appointmentDate);

                    // Execute insertion
                    int rowsAffected = preparedStatement.executeUpdate();

                    // Confirm booking
                    if (rowsAffected > 0) {
                        System.out.println("Appointment booked successfully!");
                    } else {
                        System.out.println("Failed to book appointment.");
                    }
                } else {
                    System.out.println("Doctor not available on this date!");
                }
            } else {
                System.out.println("Either doctor or patient does not exist!");
            }
        } catch (SQLException e) {
            System.out.println("Error while booking appointment:");
            e.printStackTrace();
        }
    }

    public static boolean checkDoctorAvailability(int doctorID, String appointmentDate, Connection connection) {
        //count(*) : getting the rows which the particular criteria
        String query = "SELECT COUNT(*) FROM appointments WHERE doctor_id = ? AND appointment_date= ? ";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, doctorID);
            preparedStatement.setString(2, appointmentDate);
            ResultSet resultset = preparedStatement.executeQuery();
            if (resultset.next()) {
                int count = resultset.getInt(1);
                // If count is 0, the doctor has no appointments on that date and is available.
                return count == 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
