import React from 'react'
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"


export default function Swagger  () { return <SwaggerUI url="http://localhost:8080/v3/api-docs" />}