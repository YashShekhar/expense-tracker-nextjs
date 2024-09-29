"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";

const dashboard = () => {
  const { data: session } = useSession();

  const user = session?.user.username;
  console.log("user");
  console.log(user);

  const form = useForm({
    defaultValues: {
      itemName: "",
      itemValue: "",
      expenseType: "",
      category: "",
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    },
  });

  const onSubmit = async (data: {
    itemName: string;
    itemValue: string;
    expenseType: string;
    category: string;
  }) => {
    try {
      console.log(data);
      const response = await axios.post<{ success: string; message: string }>(
        `/api/${user}/add-item`,
        data
      );
    } catch (error) {}
  };

  return (
    <div>
      <section>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Add Expense
              </h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="itemName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter item name"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            // debounced(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="itemValue"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Value</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter item value"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="expenseType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expense type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="INCOME">Income</SelectItem>
                          <SelectItem value="EXPENSE">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FOOD">Food</SelectItem>
                          <SelectItem value="EMI">EMI</SelectItem>
                          <SelectItem value="INVESTMENT">Investment</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button type="submit">SignUp</Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
      <section>
        <div>Expenses section</div>
      </section>
    </div>
  );
};

export default dashboard;
