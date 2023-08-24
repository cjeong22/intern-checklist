import React from 'react'

const Footer = ({internships}) => {
  const length = internships.filter((internship) => internship.checked).length
  return (
    <footer> 
      <ul1>
        <li>{internships.length} {internships.length === 1 ? "internship" : "internships"} listed</li>
        <li>{length} {length === 1? "internship" : "internships"} applied</li>
      </ul1>

      
    </footer>
  )
}

export default Footer