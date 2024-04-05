import Booking from "./../models/Booking.js";
import User from "./../models/User.js";
import nodemailer from "nodemailer";

// export const createBooking = async (req, res) => {
//   const newBooking = new Booking(req.body);
//   const email = req.body.userEmail; // Correctly access userEmail from req.body
//   console.log(req.body);
//   try {
//     const savedBooking = await newBooking.save();

//     // Sending email using nodemailer with SSL/TLS
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "vineetmorankar393@gmail.com",
//         pass: "dops yeeg muap fizn",
//       },
//     });

//     const mailOptions = {
//       from: "vineetmorankar393@gmail.com",
//       to: email,
//       subject: "Tour Booking Confirmation",
//       text: "Your tour is booked!",
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         res
//           .status(500)
//           .json({ success: false, message: "Email could not be sent!" });
//       } else {
//         console.log("Email sent: " + info.response);
//         res.status(200).json({
//           success: true,
//           message: "Your tour is booked! Confirmation email sent.",
//           data: savedBooking,
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error!" });
//   }
// };

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  const email = req.body.userEmail; // Correctly access userEmail from req.body

  try {
    const savedBooking = await newBooking.save();

    // Sending email using nodemailer with SSL/TLS
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "vineetmorankar393@gmail.com",
        pass: "dops yeeg muap fizn",
      },
    });

    // Define the HTML content with the styled layout and CSS
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tour Booking Confirmation</title>
        <style>
          /* CSS styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          .details {
            margin-bottom: 20px;
          }
          .details p {
            margin-bottom: 10px;
          }
          .button a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Tour Booking Confirmation</h1>
          <div class="details">
            <p><strong>Tour Name:</strong> ${req.body.tourName}</p>
            <p><strong>Full Name:</strong> ${req.body.fullName}</p>
            <p><strong>Phone:</strong> ${req.body.phone}</p>
            <p><strong>Guest Size:</strong> ${req.body.guestSize}</p>
            <p><strong>Booking Dates:</strong> ${req.body.bookAt} to ${req.body.bookUpto}</p>
            <p><strong>City:</strong> ${req.body.city}</p>
            <p><strong>Address:</strong> ${req.body.address}</p>
          </div>
          <div class="button">
            <a href="http://localhost:3000/home">View Booking Details</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: "vineetmorankar393@gmail.com",
      to: email,
      subject: "Tour Booking Confirmation",
      html: htmlContent, // Use HTML content for the email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Email could not be sent!" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          success: true,
          message: "Your tour is booked! Confirmation email sent.",
          data: savedBooking,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

//-------------------------------------------------------------------------------------------------------

// get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({ success: true, message: "Successful!", data: book });
  } catch (error) {
    res.status(404).json({ success: true, message: "Not Found!" });
  }
};

// get all booking
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();

    res
      .status(200)
      .json({ success: true, message: "Successful!", data: books });
  } catch (error) {
    res.status(500).json({ success: true, message: "Internal server error!" });
  }
};

export const userBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.find({ userId: id });

    res.status(200).json({ success: true, message: "Successful!", data: book });
  } catch (error) {
    res.status(404).json({ success: true, message: "Not Found!" });
  }
};
