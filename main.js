//get the value of inputs

var courseName=document.getElementById("courseName");
var courseCategory=document.getElementById("courseCategory");
var coursePrice= document.getElementById("coursePrice");
var courseDescription= document.getElementById("courseDescription");
var courseCapacity= document.getElementById("courseCapacity");
var addBtn= document.getElementById("click");
var data=document.getElementById("data");
var deleteBtn=document.getElementById("deleteBtn");
var search= document.getElementById("search")
var currentIndex=0;
var courses;
if(JSON.parse(localStorage.getItem('courses'))==null)
 courses=[];
else{
courses=JSON.parse(localStorage.getItem('courses'));
displayData();
}

//Create course
addBtn.onclick= function(e){
    e.preventDefault();
    if(addBtn.value=="Add Course")
        addcourse();
    else
        updateCourse();
        clearInputs();
        displayData();

      courseName.classList.remove('is-valid');
      courseCapacity.classList.remove('is-valid');
      courseCategory.classList.remove('is-valid');
      courseDescription.classList.remove('is-valid');
      coursePrice.classList.remove('is-valid');

    
    
}
//add course
function addcourse(){
    var course={
        courseName:courseName.value,
        courseCategory:courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription:courseDescription.value,
        courseCapacity:courseCapacity.value
    }
    courses.push(course);

    localStorage.setItem('courses',JSON.stringify(courses));
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Course added successfully",
        showConfirmButton: false,
        timer: 1500
      });
   

}
//clear inputs
function clearInputs(){
    courseName.value='';
    courseCategory.value='';
    coursePrice.value='';
    courseDescription.value='';
    courseCapacity.value='';

}

//Read == display data in table
function displayData(){
    var result='';//كل مرة دحط فيها صف

    for(var i=0;i<courses.length;i++){
        result+=`
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>

         </tr>
    
        `


    }
    data.innerHTML=result;

}

//delete course
function deleteCourse(index){
   

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1);
            localStorage.setItem('courses',JSON.stringify(courses));
            displayData();
          Swal.fire({
            title: "Deleted!",
            text: "Course has been deleted.",
            icon: "success"
          });
        }
      });

}

//delete all
deleteBtn.onclick=function(){
 
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem('courses',JSON.stringify(courses));
            data.innerHTML='';
          Swal.fire({
            title: "Deleted!",
            text: "All data has been deleted.",
            icon: "success"
          });
        }
      });
}


//search

search.onkeyup= function(){
    var result='';//كل مرة دحط فيها صف

    for(var i=0;i<courses.length;i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase()))
        {result+=`
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class="btn btn-info">update</button></td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>

         </tr>
    
        `

    }
    }
    data.innerHTML=result;

}

//update
function getCourse(index){
    var course=courses[index];
    courseName.value=course.courseName;
    courseCategory.value=course.courseCategory;
    coursePrice.value=course.coursePrice
    courseDescription.value=course.courseDescription;
    courseCapacity.value=course.courseCapacity;
    addBtn.value="Update Course";
    currentIndex=index;

}

function updateCourse(){
    var course={
        courseName:courseName.value,
        courseCategory:courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription:courseDescription.value,
        courseCapacity:courseCapacity.value
    }
    var name= courses[currentIndex].courseName;

    courses[currentIndex].courseName=course.courseName;
    courses[currentIndex].courseCategory=course.courseCategory;
    courses[currentIndex].coursePrice=course.coursePrice;
    courses[currentIndex].courseDescription=course.courseDescription;
    courses[currentIndex].courseCapacity=course.courseCapacity;
    localStorage.setItem('courses',JSON.stringify(courses));


    Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} updated successfully`,
        showConfirmButton: false,
        timer: 1500
      });

    addBtn.value='Add Course';
    


}



//validation (regex) name
/**
 * FIRST LETTER capital
 * 3-10 char
 * no numbers
 * ^[A-z][a-z]{2-10}$
 */
courseName.onkeyup=function(){
  var pattern=/^[A-z][a-z]{2,10}$/
  if(pattern.test(courseName.value)){
    if(courseName.classList.contains('is-invalid')
    && document.getElementById('namealert').classList.contains('d-block')){
      courseName.classList.replace('is-invalid', 'is-valid')
      document.getElementById('namealert').classList.replace('d-block','d-none')
    }
    else
      courseName.classList.add('is-valid')
      addBtn.removeAttribute('disabled')

  
  }else{
  if(courseName.classList.contains('is-valid')
  && document.getElementById('namealert').classList.contains('d-none')){
    courseName.classList.replace('is-valid', 'is-invalid')
    document.getElementById('namealert').classList.replace('d-none','d-block')
  }
  else
  document.getElementById('namealert').classList.replace('d-none','d-block')
    courseName.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')

  }



  }

  //validation (regex) category
/**
 * FIRST LETTER capital
 * 3-20 char
 * no numbers
 * ^[A-z][a-z]{2-20}$
 */
courseCategory.onkeyup=function(){
  var pattern=/^[A-z][a-z]{2,20}$/
  if(pattern.test(courseCategory.value)){
    if(courseCategory.classList.contains('is-invalid')&&
    document.getElementById('categoryalert').classList.contains('d-block'))
    {
      courseCategory.classList.replace('is-invalid', 'is-valid')
      document.getElementById('categoryalert').classList.replace('d-block','d-none')
    }
    else
      courseCategory.classList.add('is-valid')
      addBtn.removeAttribute('disabled')

  
  }else{
  if(courseCategory.classList.contains('is-valid')&&
  document.getElementById('categoryalert').classList.contains('d-none')){
    courseCategory.classList.replace('is-valid', 'is-invalid')
    document.getElementById('categoryalert').classList.replace('d-none','d-block')

  }
  else
  document.getElementById('categoryalert').classList.replace('d-none','d-block')
    courseCategory.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')

  }



  }

   //validation (regex) price
/**
 * 3 digit
 *  numbers
 * ^[0-9]{3,4}$
 */
coursePrice.onkeyup=function(){
  var pattern=/^[0-9]{3,4}$/
  if(pattern.test(coursePrice.value)){
    if(coursePrice.classList.contains('is-invalid')&&
    document.getElementById('pricealert').classList.contains('d-block')){
      coursePrice.classList.replace('is-invalid', 'is-valid')
      document.getElementById('pricealert').classList.replace('d-block', 'd-none')
    }
    else
      coursePrice.classList.add('is-valid')
      addBtn.removeAttribute('disabled')

  
  }else{
  if(coursePrice.classList.contains('is-valid')&&
  document.getElementById('pricealert').classList.contains('d-none')){
    coursePrice.classList.replace('is-valid', 'is-invalid')
    document.getElementById('pricealert').classList.replace('d-none', 'd-block')

  }
  else
    coursePrice.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')
    document.getElementById('pricealert').classList.replace('d-none', 'd-block')


  }



  }

  //validation (regex) discreption
/**
 * first letter capital
 *  numbers
 * 3-120 char
 * ^[A-Z][A-Za-z0-9\s]{3,120}$
 */
courseDescription.onkeyup=function(){
  var pattern=/^[A-Z][A-Za-z0-9\s]{3,120}$/
  if(pattern.test(courseDescription.value)){
    if(courseDescription.classList.contains('is-invalid')&&
    document.getElementById('discalert').classList.contains('d-block')){
      courseDescription.classList.replace('is-invalid', 'is-valid')
      document.getElementById('discalert').classList.replace('d-block', 'd-none')

    }
    else
      courseDescription.classList.add('is-valid')
      addBtn.removeAttribute('disabled')

  
  }else{
  if(courseDescription.classList.contains('is-valid')&&
  document.getElementById('discalert').classList.contains('d-none')){
    courseDescription.classList.replace('is-valid', 'is-invalid')
    document.getElementById('discalert').classList.replace('d-none', 'd-block')

  }
  else
    courseDescription.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')
    document.getElementById('discalert').classList.replace('d-none', 'd-block')


  }



  }


  //validation (regex) capacity
/**
 * 2-3 digit
 *  numbers
 * ^[0-9]{2,3}$
 */
courseCapacity.onkeyup=function(){
  var pattern=/^[0-9]{2,3}$/
  if(pattern.test(courseCapacity.value)){
    if(courseCapacity.classList.contains('is-invalid')&&
    document.getElementById('capalert').classList.contains('d-block')){
      courseCapacity.classList.replace('is-invalid', 'is-valid')
      document.getElementById('capalert').classList.replace('d-block','d-none')
    }
    else
      courseCapacity.classList.add('is-valid')
      addBtn.removeAttribute('disabled')

  
  }else{
  if(courseCapacity.classList.contains('is-valid')&&
  document.getElementById('capalert').classList.contains('d-none')){
    courseCapacity.classList.replace('is-valid', 'is-invalid')
    document.getElementById('capalert').classList.replace('d-none','d-block')
  }
  else
    courseCapacity.classList.add('is-invalid')
    addBtn.setAttribute('disabled','disabled')
    document.getElementById('capalert').classList.replace('d-none','d-block')

  }



  }
