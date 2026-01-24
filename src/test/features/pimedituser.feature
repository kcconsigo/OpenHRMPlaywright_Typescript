@Regressiontesting
Feature: Verify PIM User can be updated successfully
        As an Admin user
        I want to Updated PIM user on the Application

  Background:

  Scenario Outline: Admin Update Pim User successfully
    Given I am on the Pim tab
    When I select Employeelist Tab
    When I type Employee Details in EmpFirstName as "<firstName>" EmpMidName "<middleName>" EmpLastName "<lastName>" in the search box
      | firstName | middleName | lastName    |
      | user1     | pass1      | successful  |
      | user2     | pass2      | unsuccessful|
    When I click Search Button
    When I select the checkbox corresponding to the employee
    When I click the Edit button corresponding to the employee
    And I type Employee Details in EmpFirstName as "<editfirstName>" EmpMidName "<editmiddleName>" EmpLastName "<editlastName>" EmpID "<editempID>" nationality "<editnationality>" maritalstatus "<editmaritalstatus>" editgender "<editgender>" Dob "<editdob>"
      | editfirstName | editmiddleName | editlastName | editempID | editnationality | editmaritalstatus | editgender | editdob |
      | user1         | pass1          | successful   |           |                 |                   |            |         |
      | user2         | pass2          | unsuccessful |           |                 |                   |            |         |
    When I click Save Button to save the details
    Then Employee details should be updated and should see "Successfully Updated" message
