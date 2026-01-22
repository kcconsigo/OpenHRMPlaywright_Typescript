@Regressiontesting
Feature: Verify PIM User can be deleted successfully
        As an Admin user
        I want to Delete PIM user on the Application

  Background:

  Scenario Outline: Admin Delete Pim User successfully
    Given I am on the Pim tab
    When I select Employeelist Tab
    When I type Employee Details in EmpFirstName as "<editfirstName>" in the search box
    | editfirstName |
    | user1         |
    When I click Search Button
    When I select the checkbox corresponding to the employee
    When I click the Delete button corresponding to the employee
        | firstName | middleName | lastName     | empID |
        | user1     | pass1      | successful   |       |
        | user1     | pass1      | successful   |       |   
    Then Employee details should be deleted and should see "Successfully Deleted" message