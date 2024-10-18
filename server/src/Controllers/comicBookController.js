// resFunc and catchFunc use from the req-res-handlers package.
// this Package is created by Me for Handling Response and Errors.
// this function provide basic body Structure for response.
// and also provide error handling for the response.
// this package is a prototype which is work completely fine and reduce the code.
// and also reduce the time of development.
// this package is not complete version its in developement right now only two Functions done.
// for more visit the link : https://www.npmjs.com/package/req-res-handlers

import {resFunc, catchFunc} from 'req-res-handlers'
import { Comic } from '../Model/comicModel.js';

async function isExisted(req) {
    return await Comic.exists({bookName: req.body.bookName})       
}

const createComicBook = async (req, res)=>{
    try {
        
        // here first check comic book already 
        // present in the Inventory or Not.
          const exists = await isExisted(req);
          if(exists){
            return resFunc(res, 400, true ,"Comic Book is Already Available in Inventory ", {});
           }  

        const newComic = new Comic(req.body);
        const result = await newComic.save();

        if(!result){
            return resFunc(res,400, false,"Server Error: Unable to Save Data",{});
        }

        return resFunc(res,200, true,"Data Saved Successfully",{});
        
    } catch (error) {
        console.log(error);
        catchFunc(res,500,"Internal Server Error",{ 
            error:error.message,
            message: 'Something went wrong. We are working to fix it.' 
        });
    }
}


const getComicBooks = async(req, res)=>{
    try {

        const {
            page = 1, 
            limit = 10,
            yearOfPublication,
            authorName,
            price_min,
            price_max,
            condition,
            sort_by = 'bookName',
            sort_order = 'asc',
            id
          } = req.query; 
          // page query parameter indicate which on we by default 1
          // limit indicate how much data we diplay by default 10
          // yearOfPublication indicate which years comic book we want
          // authorName indicate which author books we want to see
          // price_min and price_max use to filter minimum and maximum values comic books
          // condition indicate book is used or new
          // sort_by use to sort books by default its value bookName 
          // sort_order is use to sort books in assending or dessending order by default is asc

          // if we have id then this block of code is execute 
          if(id){
            const comic = await Comic.findById(id); //find comic book by ID
            if(!comic){
                return resFunc(res, 404, false, "Not Found",{});
            }
            return resFunc(res, 200, true,"Success", comic);
          }

          // Build filter object
          const filter = {};
          if (authorName) 
                filter.authorName = new RegExp(authorName, 'i'); 
                // Case insensitive regex
          if (yearOfPublication)
                filter.yearOfPublication = parseInt(yearOfPublication);
          if (price_min || price_max) 
            {
                filter.price = {};
                if (price_min) filter.price.$gte = parseFloat(price_min);
                if (price_max) filter.price.$lte = parseFloat(price_max);
            }

          if (condition) filter.condition = condition;
      
          // Build sort options
          const sortOptions = {};
          sortOptions[sort_by] = sort_order === 'asc' ? 1 : -1;
      
          // Fetch comics with pagination
          const comics = await Comic.find(filter)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
      
          // Get total count and total pages
          const total_count = await Comic.countDocuments(filter);
          const total_pages = Math.ceil(total_count / limit);
      
          // Send response
            resFunc(res, 200,true,"Success",{
                page: parseInt(page),
                limit: parseInt(limit),
                total_count,
                total_pages,
                comics,
              })
        
    } catch (error) {
        catchFunc(res,500,"Internal Server Error",{ 
            error:error.message,
            message: 'Something went wrong. We are working to fix it.' 
        })
    }
}


const getAllComicBooks = async(req, res)=>{
    try {
     
        const result = await Comic.find();
        if(!result){
            return resFunc(res,400,false,"Comic Book Not Found",{});
        }

        return resFunc(res,200,true,"Success",result);// here we getting all comic book data without sorting and filter
        
    } catch (error) {
        catchFunc(res,500,"Internal Server Error",{ 
            error:error.message,
            message: 'Something went wrong. We are working to fix it.' 
        });
    }
}

const updateComicBooks = async(req, res)=>{

    try {

        // here we Receiving id
        const { id } = req.query;

        // if we not Receiving id then rend response
        if(!id){
            return resFunc(res, 400, false, "Comic Book Id is Required");
        }

        // based on the id we find Document and update body (comicBook Object)
        const comic = await Comic.updateOne({_id:id},req.body);
    
        // if comic is not then Comic Book not Found
        if(!comic){
        return resFunc(res,404,false,"Comic Book Not Found");
        }

        // if comic object modifiedCount key's value is 1 then we return success response
        if(comic.modifiedCount === 1){
            resFunc(res,200,true,"Updated successfully",{});    
        } 

    } catch (error) {
        catchFunc(res,500,"Internal Server Error",{ 
            error:error.message,
            message: 'Something went wrong. We are working to fix it.' 
        }); 
    }
}

const deleteComicBook = async(req, res)=>{
    try {

        const {id} = req.query;
        
        if(!id){
            return resFunc(res,400, false , "Comic Book Id is Required",{})
        }

        const comic = await Comic.deleteOne({_id:id});

        if(!comic){
            resFunc(res, 400, false, "Conic Book Not Found");
        }

        if(comic.deletedCount === 1){
            resFunc(res,200,true,"Deleted successfully",{});
        }
        
    } catch (error) {
        catchFunc(res,500,"Internal Server Error",{ 
            error:error.message,
            message: 'Something went wrong. We are working to fix it.' 
        }); 
    }
}


export { 
    createComicBook ,
    getComicBooks,
    getAllComicBooks,
    updateComicBooks,
    deleteComicBook}