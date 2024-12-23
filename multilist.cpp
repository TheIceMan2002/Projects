//  Name: Ben Bryant
//  Assignment number: 5
//  Assignment: Multilists
//  File name: multilist.cpp
//  Date last modified: October 7, 2024
//  Honor statement: I have neither given nor received any unauthorized help on this assignment.
#include <iostream>
#include "multilist.h"

Multilist::Node::Node(int id, std::string name, int age):

    id(id), name(name), age(age), 
    prev_id(nullptr), next_id(nullptr),
    prev_name(nullptr), next_name(nullptr),
    prev_age(nullptr), next_age(nullptr) {
        for (size_t i = 0; i < this->name.length(); ++i) {
            this->name[i] = std::toupper(this->name[i]);
        }
       }

//Creating first and last sentinal nodes.
Multilist::Multilist() {
    first = new Node(0, "", 0);
    last = new Node(0, "",0);

    first->next_id = last;
    last->prev_id = first;

    first->next_name = last;
    last->prev_name = first;

    first->next_age = last;
    last->prev_age = first;
}
//deconstruction of nodes preventing memory leaks. 
//Id is selected since it's the first item to appear in the node,
//but others can be used. 
Multilist::~Multilist() {
    Node *current = first->next_id;
    while(current != last) {
        Node *next = current->next_id;
        delete current;
        current = next;
    }
    delete first;
    delete last;
}

bool Multilist::insert(int id, std::string name, int age){
    Node *current = first->next_id;
    while(current != last){
        if(current->id == id){
            return false;
        }
        current = current->next_id;
    }
    
    Node *newNode = new Node(id, name, age);

    current = first;
    //The following line checks if the current id is the in the last node.
    //It also checks to see if the next node's id value is larger than the current nodes id value
    //If it is smaller than the current node's id value the pointer moves to the next node's id.
    while(current->next_id != last && current->next_id->id < id) {
        current = current->next_id;
    }
    //linking the old pointers to the newNode and newNode pointers to
    //the node that previously came after current.
    newNode->next_id = current->next_id;
    newNode->prev_id = current;
    current->next_id->prev_id = newNode;
    current->next_id = newNode;
 
    current = first;
    while(current->next_name != last && current->next_name->name < newNode->name){
        current = current->next_name;
    }
    newNode->next_name = current->next_name;
    newNode->prev_name = current;
    current->next_name->prev_name = newNode;
    current->next_name = newNode;

    current = first;
    while(current->next_age != last && current->next_age->age < age){
        current = current->next_age;
    }
    newNode->next_age = current->next_age;
    newNode->prev_age = current;
    newNode->next_age->prev_age = newNode;
    current->next_age = newNode;

    return true;

}
bool Multilist::remove(int id){
    // Starting from the first node
    Node *current = first->next_id;

    //Loop through all the nodes until the last one is reached
    while(current !=last){
        //If the id we're looking for is found
        if(current->id == id){
            //Unlink from id...
            current->prev_id->next_id = current->next_id;
            current->next_id->prev_id =current->prev_id;
            //from name...
            current->prev_name->next_name = current->next_name;
            current->next_name->prev_name = current->prev_name;

            //And from age
            current->prev_age->next_age = current->next_age;
            current->next_age->prev_age = current->prev_age;

            //Finally, delete the node once all the pointers are unlinked
            //and return true
            delete current;
            return true;
        }
        //if the conditional statement is not met continue to the next node
        current = current->next_id;
    }
    return false;
}

void Multilist::print_by_name(){
    Node *current = first->next_name;
    while(current !=last){
        std::cout << "(" << current->name << "," << current->id << "," << current->age << ")\n";
        current = current->next_name;
    }    
}

void Multilist::print_by_name_reverse(){
    Node *current = last->prev_name;
    while(current != first){
        std::cout << "(" << current->name << "," << current->id << "," << current->age << ")\n";
        current = current->prev_name; 
    }
}

void Multilist::print_by_ID(){
    Node *current = first->next_id;
    while(current != last){
        std::cout << "(" << current->name << "," << current->id << "," << current->age << ")\n";
        current = current->next_id;
    }
}

void Multilist::print_by_ID_reverse(){
    Node *current = last->prev_id;
    while(current !=first){
        std::cout << "(" << current->name << "," << current->id << "," << current->age << ")\n";
        current = current->prev_id;
    }
}
void Multilist::print_by_age(){
    Node *current = first->next_age;
    while(current !=last){
        std::cout << "(" << current->name << "," << current->id << "," << current->age << ")\n";
        current = current->next_age; 
    }
}
void Multilist::print_by_age_reverse(){
    Node *current = last->prev_age;
    while(current !=first){
        std::cout << "(" << current->name << "," << current->id << "," << current->age << ")\n";
        current = current->prev_age;
    }
}
