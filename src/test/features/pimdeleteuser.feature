@Regressiontesting
Feature: Verify PIM User can be deleted successfully
        As an Admin user
        I want to Delete PIM user on the Application

  Background:

  Scenario Outline: Admin Delete Pim User successfully
    Given I am on the Pim tab
    When I select Employeelist Tab
    When I type Employee Details in EmpFirstName as "<editfirstName>" EmpMidName "<editmiddleName>" EmpLastName "<editlastName>" in the search box
    | editfirstName | editmiddleName | editlastName |
    | user1         | pass1          | successful   |
    When I click Search Button
    When I select the checkbox corresponding to the employee
    When I click the Delete button corresponding to the employee
        | editfirstName | editmiddleName | editlastName | empID |
        | user1         | pass1          | successful   |       |
        | user2         | pass2          | unsuccessful |       |
    Then Employee details should be deleted and should see "Successfully Deleted" message